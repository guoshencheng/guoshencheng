
import { render } from 'react-dom';
import { Component } from 'react';

const mashroom = [
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
]

const _colors = {
  red: 4, 'deep-blue': 4, yellow: 3, 'shadow-blue': 4, black: 1, grey: 1
}

const randomColor = (noYellow) => {
  const colors = Object.assign({}, _colors);
  if (noYellow) delete colors.yellow;
  const sum = Object.keys(colors).reduce((pre, key)=> {
    return pre + colors[key]
  }, 0)
  const value = Math.random() * (sum - 1) + 1;
  const result = Object.keys(colors).reduce((pre, key) => {
    const { done, s, result } = pre;
    if (!done) {
      if (value > s + colors[key]) {
        pre.s = s + colors[key];
      } else {
        pre.result = key;
        pre.done = true;
      }
    }
    return pre;
  }, { done: false, s: 0, result: '' });
  return result.result;
}

class Mashroom extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="mashroom">
        {
          mashroom.map((line, index) => {
            let isDeep = index % 2 == 0 ? false : true;
            return (
              <div key={ index } className="mashroom-item-line">
                {
                  line.map((item, i) => {
                    const isFirstLeft = i == 0 || line[i - 1] == 0;
                    const isFirstRight = i == line.length - 1 || line[i + 1] == 0;
                    const isFirstTop = index == 0 || mashroom[index - 1][i] == 0;
                    const isFirstBottom = index == mashroom.length - 1 || mashroom[index + 1][i] == 0;
                    // const color = randomColor(isFirstLeft || isFirstRight || isFirstTop || isFirstBottom);
                    isDeep = !isDeep
                    const color = isDeep ? 'deep' : "shadow";
                    return (
                      <div key={ i } style={ { animationDelay: -((index * line.length + i) * 0.1) + 's' } } className={['change-color', "mashroom-item", (item == 0 ? 'blank' : color) ].join(' ')}>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}

render(
  <Mashroom></Mashroom>,
  document.querySelector('#mashroom-container')
)
