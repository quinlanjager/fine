export default function ({ title }) {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px",
        backgroundColor: "#ffffff",
        color: "#000000",
        fontFamily:
          "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.2,
            color: "#000000",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#888888",
          }}
        >
          Task management for agents
        </div>
      </div>
    </div>
  );
}
