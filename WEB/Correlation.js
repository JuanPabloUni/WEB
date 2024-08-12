// @Juan Pablo Hernández - 202122707

async function getData() {
    const response = await fetch('https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json');
    const data = await response.json();
    return data;
  }

  async function correlation() {
    try {

      const data = await getData();

      const events = [];
      const positiveNegatives = [];
  
      data.forEach(day => {
        day.events.forEach(event => {
            if (events[event]) {
                events[event]++;
              } else {
                events[event] = 1;
              }
            if (!positiveNegatives[event]) {
                positiveNegatives[event] = [0, 0, 0, 0];
            }
        })
      });

      // console.log(events);

      data.forEach(day => {
        if(!day.squirrel) {
            Object.keys(events).forEach(event => {
                    if(!(day.events.includes(event))) {
                        positiveNegatives[event][0]++
                    } else {
                        positiveNegatives[event][1]++
                    }
                });
            } else {
                Object.keys(events).forEach(event => {
                    if(!(day.events.includes(event))) {
                        positiveNegatives[event][2]++
                    } else {
                        positiveNegatives[event][3]++
                    }
                });
            }
        });
    
        Object.entries(positiveNegatives).forEach(value => {
            nums = value[1];
            events[value[0]] = (((nums[3] * nums[0]) - (nums[2] * nums[1])) / (Math.sqrt((nums[3] + nums[2]) * (nums[3] + nums[1]) * (nums[0] + nums[2]) * (nums[0] + nums[1]))));
        });

        console.log(events)

    } catch (error) {
        console.error('Error al procesar los datos:', error);
      }
}

  correlation();