import Link from "next/link";
import { title } from "process";
import React from 'react';




const Subject = (props) => {
  return (
    <>{props.params.id} subject</>
  );
};

export default Subject;
