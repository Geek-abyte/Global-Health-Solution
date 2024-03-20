import React from "react";
import { group } from "../../assets";
import { Link } from "react-router-dom";

const Page404 = () => {
  return <>
    <main className="flex flex-col text-center items-center justify-center py-[100px]">
      <img src={group} alt="ghost picture"  className="w-[200px]" />
      <div>
        <h1 className="text-[100px] font-extrabold text-primary-2">404</h1>
        <p className="text-[24px] text-primary-6">Something is Wrong Please</p>
      </div>
      <Link className="text-[24px] text-primary-6 font-bold underline">GO BACK</Link>
    </main>
  </>;
};


export default Page404;