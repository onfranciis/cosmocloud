import "./styles/App.scss";
import Field, { ObjectTypProperty } from "./components/Field";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

type DATAType = {
  title: string;
  type: string | ObjectTypProperty;
  child?: DATAType;
}[];

const DATA: DATAType = [
  { type: "String", title: "Hello" },
  { type: "Number", title: "Hii" },
  {
    type: "Object",
    title: "First Object",
    child: [
      { type: "String", title: "Hello" },
      { type: "Number", title: "Hii" },
      {
        type: "Object",
        title: "no",
        child: [
          { type: "String", title: "Hello" },
          { type: "Number", title: "Hii" },
        ],
      },
    ],
  },
  {
    type: "Object",
    title: "Hii:SecondToLast",
    child: [
      { type: "String", title: "Hello" },
      { type: "Number", title: "Hii" },
      {
        type: "Object",
        title: "Hii:Last",
        child: [
          { type: "String", title: "Hello1" },
          { type: "String", title: "Hello2" },
        ],
      },
    ],
  },
];

const DATAList: JSX.Element[] = [];

const handleFieldLoop = (Source: DATAType): any => {
  Source.forEach((field, index) => {
    if (field.type == "Object") {
      DATAList.push(
        <Field
          key={uuidv4()}
          Title={field.title}
          Type={field.type}
          Update={(data) => {
            DATA[index] = {
              ...DATA[index],
              title: data.title,
              type: data.type,
            };
          }}
        />
      );
      DATAList.push(
        <div className="ObjectChild">{handleFieldLoop(field.child!)}</div>
      );
    } else {
      DATAList.push(
        <Field
          key={uuidv4()}
          Title={field.title}
          Type={field.type}
          Update={(data) => {
            DATA[index] = {
              ...DATA[index],
              title: data.title,
              type: data.type,
            };
          }}
        />
      );
    }
  });
};

handleFieldLoop(DATA);
console.log(DATAList);

function App() {
  useEffect(() => {}, [DATA]);

  return (
    <div className="App">
      <button
        onClick={() => {
          DATA.push({ type: "String", title: "New" });
        }}
      >
        Add New Field
      </button>
      {DATAList}

      <button
        onClick={() => {
          console.log(DATA);
        }}
      >
        Save
      </button>
    </div>
  );
}

export default App;
