import React from "react";

interface PROPS {
  id: string;
  path: string;
  delete: any
  all: string
}

const ImagePreview: React.FC<PROPS> = (props) => {
  return (
    // 画像を1:1に切り取るcssをしよう
    <div className={props.all ? "p-media__allThumb":"p-media__thumb"}  onClick={() => props.delete(props.id)}>
      <img alt="" src={props.path} />
    </div>
  );
};

export default ImagePreview;
