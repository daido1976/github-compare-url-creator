import React, { useState } from "react";
import { StorageKey, fetchFromStorage } from "../storage";

export type TextField = {
  type: "text";
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const useTextField = ({
  placeholder,
  key,
}: {
  placeholder: string;
  key: StorageKey;
}): [TextField, React.Dispatch<React.SetStateAction<string>>] => {
  const type: "text" = "text";
  const initialValue = fetchFromStorage(key);
  const [value, setValue] = useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [
    {
      type,
      value,
      placeholder,
      onChange,
    },
    setValue,
  ];
};
