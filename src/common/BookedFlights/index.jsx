import './style.css';

function BookedFlights() {
  const array = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
    {
      id: 9,
    },
    {
      id: 10,
    },
    {
      id: 11,
    },
    {
      id: 12,
    },
    {
      id: 13,
    },
    {
      id: 14,
    },
    {
      id: 15,
    },
    {
      id: 16,
    },
    {
      id: 17,
    },
    {
      id: 18,
    },
    {
      id: 19,
    },
    {
      id: 20,
    },
    {
      id: 21,
    },
  ];
  const arr = [
    [
      [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
      [
        {
          id: 3,
        },
        {
          id: 4,
        },
        {
          id: 5,
        },
      ],
      [
        {
          id: 6,
        },
        {
          id: 7,
        },
      ],
    ],
    [
      [
        {
          id: 8,
        },
        {
          id: 9,
        },
      ],
      [
        {
          id: 10,
        },
        {
          id: 11,
        },
        {
          id: 12,
        },
      ],
      [
        {
          id: 13,
        },
        {
          id: 14,
        },
      ],
    ],
    [
      [
        {
          id: 15,
        },
        {
          id: 16,
        },
      ],
      [
        {
          id: 17,
        },
        {
          id: 18,
        },
        {
          id: 19,
        },
      ],
      [
        {
          id: 20,
        },
        {
          id: 21,
        },
      ],
    ],
  ];

  function twoDarray(arr, totalPerArray) {
    let i = 0;
    let twoDimension = []; // Store the generated two D array
    let tempArr = [...arr]; // Avoid modifying original array

    while (i < arr.length) {
      let subArray = []; // Store 2D subArray

      for (var j = 0; j < totalPerArray; j++) {
        if (tempArr.length) subArray.push(tempArr.shift());
      }

      twoDimension[twoDimension.length] = subArray;
      i += totalPerArray;
    }
    return twoDimension;
  }
  const arrww = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let rrr = twoDarray(arrww, 2);

  console.log(twoDarray(rrr, 2));
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {arr.map((singArr) => (
        <div className='r-main'>
          <div className='c1'>
            {singArr[0].map((i) => (
              <p>{i.id}</p>
            ))}
          </div>
          <div className='c2'>
            {singArr[1].map((i) => (
              <p>{i.id}</p>
            ))}
          </div>
          <div className='c3'>
            {singArr[2].map((i) => (
              <p>{i.id}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookedFlights;
