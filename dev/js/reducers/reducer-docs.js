export default function(state = null, action) {
  console.log(action);
  var docs = [
    {
      id: 1,
      title: "/home/0",
      modified: "1483621103481",
      type: 'folder',
      img: "./assets/folder.png"
    }, {
      id: 2,
      title: "/home/2.docx",
      modified: "1483621003481",
      type: 'file',
      img: "./assets/doc.png"
    }, {
      id: 3,
      title: "/home/3.pdf",
      modified: "1473620903481",
      type: 'file',
      img: "./assets/doc.png"
    }, {
      id: 4,
      title: "/home/4.png",
      modified: "1493620803481",
      type: 'file',
      img: "./assets/png.png"
    }, {
      id: 5,
      title: "/home/1",
      modified: "1483620703481",
      type: 'folder',
      img: "./assets/folder.png"
    }, {
      id: 6,
      title: "/home/1/6.docx",
      modified: "1483620603481",
      type: 'file',
      img: "./assets/doc.png"
    }, {
      id: 7,
      title: "/home/1/7.pdf",
      modified: "1483620503481",
      type: 'file',
      img: "./assets/doc.png"
    }, {
      id: 8,
      title: "/home/1/8.png",
      modified: "1483620403481",
      type: 'file',
      img: "./assets/png.png"
    }, {
      id: 9,
      title: "/home/2",
      modified: "1483620303481",
      type: 'folder',
      img: "./assets/folder.png"
    }, {
      id: 10,
      title: "/home/2/10.docx",
      modified: "1483620203481",
      type: 'file',
      img: "./assets/doc.png"
    }, {
      id: 11,
      title: "/home/2/11.pdf",
      modified: "1483620103481",
      type: 'file',
      img: "./assets/doc.png"
    }, {
      id: 12,
      title: "/home/2/12.png",
      modified: "1483620003481",
      type: 'file',
      img: "./assets/png.png"
    }

  ];
  switch (action.type) {
    case 'ADD_FOLDER':
      console.log(state);
      return [
        ...state, {
          id: Date.now(),
          title: action.payload.name,
          modified: "" + Date.now(),
          type: action.payload.type,
          img: action.payload.img
        }
      ];
      break;
    case 'DELETE_FILE':
      return [...state.filter((doc) => doc.id != action.payload)];
  }
  //  return state;

  return docs;
}
