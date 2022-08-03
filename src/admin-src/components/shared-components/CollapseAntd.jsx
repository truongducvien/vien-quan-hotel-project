import { Collapse } from "antd";

const TEXT_COLLAPSE_OPTIONS = {
  collapse: false,
  collapseText: "... show more",
  expandText: "show less",
  minHeight: 70,
  maxHeight: 230,
  textStyle: {
    color: "grey",
    fontSize: "13px",
  },
};

export default function CollapseAntd({ text }) {
  return (
    <div>
      {/* <Collapse>{text}</Collapse> */}
      <p>{text}</p>
    </div>
  );
}
