//defines the look of a todo item
const cardStyle = {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
};

function Card(props: any) {
  return <div style={cardStyle}>{props.children}</div>;
}

export default Card;
