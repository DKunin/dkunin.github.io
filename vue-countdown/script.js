'use strict';
var padDigits = function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) +
        number;
};
var calculatePercentsLeft = function calculatePercentsLeft(value, from) {
    return Math.floor(Math.ceil(value / 1000) / (from * 60) * 100);
};
var calculateScaleFactor = function calculateScaleFactor(percent) {
    return 1 - (100 - percent) / 100;
};

function guid() {
    function s4() {
        return Math
            .floor((1 + Math.random()) * 65536)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() +
        s4() +
        s4();
}
var settings = {
    water: {
        buttonTxt: 'Drink',
        waveFrontColor: '#32BAFA',
        waveBackColor: '#2C7FBE',
        stageBg: '#1E384C',
        durationInMinutes: 1
    },
    coffee: {
        buttonTxt: 'Drink coffee',
        waveFrontColor: '#b39374',
        waveBackColor: '#7a6057',
        stageBg: '#392a2c',
        durationInMinutes: 2
    },
    break: {
        buttonTxt: 'Take a break',
        waveFrontColor: '#02C39A',
        waveBackColor: '#028090',
        stageBg: '#012F35',
        durationInMinutes: 1
    },
    pomodoro: {
        buttonTxt: 'Switch task',
        waveFrontColor: '#e74c3c',
        waveBackColor: '#c0392b',
        stageBg: '#2c3e50',
        durationInMinutes: 15
    }
};
new Vue({
    el: '#stage',
    data: function data() {
        return {
            color: '',
            percents: [ 100 ],
            percentsLeft: 100,
            secondsLeft: 0,
            waveStyles: '',
            duration: 1,
            timer: [],
            voicesOpen: false,
            voices: [],
            selectedVoice: {},
            countdownObj: {},
            activeReminder: settings.water,
            menuOpen: false,
            isListening: false,
            voiceTooltipClosed: false,
            stageBg: settings.water.stageBg
        };
    },
    mounted: function mounted() {
        var _this = this;
        this.resetTimer();
        this.voices = speechSynthesis.getVoices();
        if (this.voices.length === 0) {
            speechSynthesis.onvoiceschanged = function() {
                _this.voices = speechSynthesis.getVoices();
            };
        }
    },
    computed: {
        supportSpeechSynth: function supportSpeechSynth() {
            return 'speechSynthesis' in window;
        }
    },
    watch: {
        percentsLeft: function percentsLeft(val, oldVal) {
            if (val === oldVal) {
                return;
            }
            this.percents.splice(0, 1);
            this.percents.push(val);
        }
    },
    methods: {
        setActiveReminder: function setActiveReminder(reminder) {
            this.activeReminder = settings[reminder];
            this.stageBg = this.activeReminder.stageBg;
        },
        toggleMenu: function toggleMenu() {
            this.menuOpen = !this.menuOpen;
            if (this.menuOpen) {
                this.pauseTimer();
                this.waveStyles = 'transform: translate3d(0,100%,0); transition-delay: .25s;';
            } else {
                this.continueTimer();
            }
        },
        toggleVoicesMenu: function toggleVoicesMenu() {
            this.voicesOpen = !this.voicesOpen;
        },
        voiceSelected: function voiceSelected(voice) {
            this.selectedVoice = voice;
            speechSynth.voice = voice;
        },
        start: function start(reminder) {
            this.setActiveReminder(reminder);
            this.percents = [ 100 ];
            this.timer = [];
            this.menuOpen = false;
            this.resetTimer();
        },
        resetTimer: function resetTimer() {
            var durationInSeconds = 60 * this.activeReminder.durationInMinutes;
            this.startTimer(durationInSeconds);
        },
        startTimer: function startTimer(secondsLeft) {
            var _this2 = this;
            var now = new Date();
            if (this.countdown) {
                window.clearInterval(this.countdown);
            }
            this.countdown = countdown(
                function(ts) {
                    _this2.secondsLeft = Math.ceil(ts.value / 1000);
                    _this2.percentsLeft = calculatePercentsLeft(
                        ts.value,
                        _this2.activeReminder.durationInMinutes
                    );
                    _this2.waveStyles = 'transform: scale(1,' +
                        calculateScaleFactor(_this2.percentsLeft) +
                        ')';
                    _this2.updateCountdown(ts);
                    if (_this2.percentsLeft == 10) {
                        _this2.giveWarning();
                    }
                    if (_this2.percentsLeft <= 0) {
                        _this2.timeIsUpMessage();
                        _this2.pauseTimer();
                        _this2.timer = [];
                        setTimeout(
                            function() {
                                _this2.startListenVoiceCommands();
                            },
                            1500
                        );
                    }
                },
                now.getTime() + secondsLeft * 1000
            );
        },
        updateCountdown: function updateCountdown(ts) {
            if (this.timer.length > 2) {
                this.timer.splice(2);
            }
            var newTime = {
                id: guid(),
                value: padDigits(ts.minutes, 2) + ':' + padDigits(ts.seconds, 2)
            };
            this.timer.unshift(newTime);
        },
        pauseTimer: function pauseTimer() {
            window.clearInterval(this.countdown);
        },
        continueTimer: function continueTimer() {
            if (this.secondsLeft > 0) {
                this.startTimer(this.secondsLeft - 1);
            }
        },
        giveWarning: function giveWarning() {},
        timeIsUpMessage: function timeIsUpMessage() {
            navigator.vibrate(1000);
        },
        timerResetMessage: function timerResetMessage() {
            navigator.vibrate([ 500, 300, 100 ]);
        },
        reset: function reset() {
            this.resetTimer();
            this.timerResetMessage();
        },
        startListenVoiceCommands: function startListenVoiceCommands() {
            var _this3 = this;
            if (this.isListening)
                return;
            this.isListening = true;
            recognition.start();
            recognition.onresult = function(event) {
                var last = event.results.length - 1;
                if (event.results[last][0].transcript == 'reset') {
                    _this3.resetTimer();
                    _this3.timerResetMessage();
                }
            };
            recognition.onend = function() {
                _this3.isListening = false;
                _this3.voiceTooltipClosed = true;
                recognition.stop();
            };
        },
        mouseOver: function mouseOver(type) {
            this.stageBg = settings[type].stageBg;
        },
        mouseOut: function mouseOut() {
            this.stageBg = this.activeReminder.stageBg;
        }
    }
});