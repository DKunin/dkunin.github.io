Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  slideNumber: true,
  center: true,
  transition: 'linear',
  transitionSpeed: 'default',
    dependencies: [
          { src: 'js/plugins/highlight.js', callback: function() { hljs.initHighlightingOnLoad(); } },
          { src: 'js/plugins/zoom.js', condition: function() { return !!document.body.classList; } }
        ]  
});


