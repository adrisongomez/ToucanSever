import React from "react";

const SingUpPage = ({ data }) => {
  console.log(data);
  return (
    <div>
       <p>It&apos;s working </p>
          <img src={data.picture} alt=""/>
    </div>
  );
};

SingUpPage.getInitialProps = async ctx => {
  const { req } = ctx;
  if (req.query.data === undefined) return;
  const data = JSON.parse(req.query.data);
  return { data };
};

export default SingUpPage;
