
export default function (state = null, action) {
  console.log(action);
    var docs= [
      {
          id: 1,
          title: "/home/0",
          modified:"12:39 AM ,To4day",
          type:'folder',
          img:"./assets/folder.png"
      },
      {
          id: 2,
          title: "/home/2.docx",
          modified:"12.29,Today",
          type:'file',
          img:"./assets/doc.png"
      },
      {
          id: 3,
          title: "/home/3.pdf",
          modified:"12:34 AM ,31 Dec'16",
          type:'file',
          img:"./assets/doc.png"
      },
      {
          id: 4,
          title: "/home/4.png",
          modified:"07.37,1 Jan'17",
          type:'file',
          img:"./assets/png.png"
      },
      {
          id: 5,
          title: "/home/1",
          modified:"12:39 AM ,Today",
          type:'folder',
          img:"./assets/folder.png"
      },
      {
          id: 6,
          title: "/home/1/6.docx",
          modified:"12.29,Today",
          type:'file',
          img:"./assets/doc.png"
      },
      {
          id: 7,
          title: "/home/1/7.pdf",
          modified:"12:34 AM ,31 Dec'16",
          type:'file',
          img:"./assets/doc.png"
      },
      {
          id: 8,
          title: "/home/1/8.png",
          modified:"07.37,1 Jan'17",
          type:'file',
          img:"./assets/png.png"
      },
      {
          id: 9,
          title: "/home/2",
          modified:"12:39 AM ,Today",
          type:'folder',
          img:"./assets/folder.png"
      },
      {
          id: 10,
          title: "/home/2/10.docx",
          modified:"12.29,Today",
          type:'file',
          img:"./assets/doc.png"
      },
      {
          id: 11,
          title: "/home/2/11.pdf",
          modified:"12:34 AM ,31 Dec'16",
          type:'file',
          img:"./assets/doc.png"
      },
      {
          id: 12,
          title: "/home/2/12.png",
          modified:"07.37,1 Jan'17",
          type:'file',
          img:"./assets/png.png"
      }

    ];
    switch (action.type) {
        case 'ADD_FOLDER':
        console.log(state);
            return [...state,{
                id: Date.now(),
                title: action.payload.name,
                modified:"07.37,1 Jan'17",
                type:action.payload.type,
                img:action.payload.img
            }];
            break;
        case 'GET_FOLDER_FILES':
        return [...state.filter((doc)=>doc.title==action.payload.data)];
    }
  //  return state;

    return docs;
}
