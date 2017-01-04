
export default function (state = null, action) {
  console.log(action);
    var docs= [
      {
          id: 1,
          title: "Folder 1",
          modified:"12:39 AM ,Today",
          img:"./assets/folder.png"
      },
      {
          id: 2,
          title: "Deboarding Document.docx",
          modified:"12.29,Today",
          img:"./assets/doc.png"
      },
      {
          id: 3,
          title: "System Setup.pdf",
          modified:"12:34 AM ,31 Dec'16",
          img:"./assets/doc.png"
      },
      {
          id: 4,
          title: "interface.png",
          modified:"07.37,1 Jan'17",
          img:"./assets/png.png"
      },
      {
          id: 5,
          title: "Folder 1",
          modified:"12:39 AM ,Today",
          img:"./assets/folder.png"
      },
      {
          id: 6,
          title: "Deboarding Document.docx",
          modified:"12.29,Today",
          img:"./assets/doc.png"
      },
      {
          id: 7,
          title: "System Setup.pdf",
          modified:"12:34 AM ,31 Dec'16",
          img:"./assets/doc.png"
      },
      {
          id: 8,
          title: "interface.png",
          modified:"07.37,1 Jan'17",
          img:"./assets/png.png"
      },
      {
          id: 9,
          title: "Folder 1",
          modified:"12:39 AM ,Today",
          img:"./assets/folder.png"
      },
      {
          id: 10,
          title: "Deboarding Document.docx",
          modified:"12.29,Today",
          img:"./assets/doc.png"
      },
      {
          id: 11,
          title: "System Setup.pdf",
          modified:"12:34 AM ,31 Dec'16",
          img:"./assets/doc.png"
      },
      {
          id: 12,
          title: "interface.png",
          modified:"07.37,1 Jan'17",
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
                img:action.payload.img
            }];
            break;
    }
  //  return state;

    return docs;
}
