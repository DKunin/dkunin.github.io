
import Bricks from 'bricks.js';
import shuffleArray from 'array-shuffle';

const sizes = [
  { columns: 2, gutter: 0 },                   // assumed to be mobile, because of the missing mq property
  { mq: '768px', columns: 5, gutter: 0 },
  { mq: '1024px', columns: 6, gutter: 0 }
];

// create an instance

const instance = Bricks({
    container: '.grid',
    packed:    'data-packed',        // if not prefixed with 'data-', it will be added
    sizes:     sizes
});

// bind callbacks

instance
  .on('pack',   () => console.log('ALL grid items packed.'))
  .on('update', () => console.log('NEW grid items packed.'))
  .on('resize', size => console.log('The grid has be re-packed to accommodate a new BREAKPOINT.'));

// start it up, when the DOM is ready
// note that if images are in the grid, you may need to wait for document.readyState === 'complete'

function clearGrid(gridNode) {
    while (gridNode.firstChild) {
        gridNode.removeChild(gridNode.firstChild);
    }
}

function imageItem(src) {
    const newImage = document.createElement('img');
    newImage.src = src;
    return newImage;
}

function redraw() {
    const grid = document.querySelector('.grid');
    const images = Array.from(document.querySelectorAll('.js-data img'));
    clearGrid(grid);
    shuffleArray(images).slice(0, 20).forEach(singleImage => {
        grid.appendChild(imageItem(singleImage.src.replace(/.+ensaver\//g, '')));
    });
    instance
      .resize(true)
      .pack();
}

document.addEventListener('DOMContentLoaded', event => {
    setInterval(redraw, 30000);
    redraw();
});

