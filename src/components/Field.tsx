import { useState } from "react";
import "../styles/Field.scss";

export type ObjectTypProperty = "String" | "Number" | "Boolean" | "Object";

type FieldPropType = {
  Title: string;
  Type: ObjectTypProperty | string;
  Update: (data: { title: string; type: ObjectTypProperty | string }) => void;
};

const Field = ({ Title, Type, Update }: FieldPropType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(Title);
  const [selectValue, setSelectValue] = useState<ObjectTypProperty | string>(
    Type
  );

  const handleBlur = () => {
    Update({ type: selectValue, title: inputValue });
    setEditMode(false);
  };

  return (
    <div className="Field">
      <div className="left">
        {editMode ? (
          <input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.currentTarget.value);
            }}
            onBlur={() => handleBlur()}
            autoFocus
          />
        ) : (
          <p
            onClick={() => {
              setEditMode(true);
            }}
          >
            {inputValue}
          </p>
        )}
      </div>

      <select
        name="Options"
        id="Options"
        value={selectValue}
        onChange={(e) => {
          setSelectValue(e.currentTarget.value);
        }}
      >
        <option value="String">String</option>
        <option value="Number">Number</option>
        <option value="Boolean">Boolean</option>
        <option value="Object">Object</option>
      </select>
    </div>
  );
};

export default Field;
