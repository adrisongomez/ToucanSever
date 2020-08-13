import React from "react";

import HeaderPublic from "../header-public/header-public.component";

const HeaderPreview = ({ isPublic }) => {
  const header = isPublic ? <HeaderPublic /> : <div />;
  return header;
};

export default HeaderPreview;
