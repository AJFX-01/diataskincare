export default function ChatBot() {
  return (
    <Card cardClass={styles.card}>
      <div className={styles["bot-container"]}>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </Card>
  );
}