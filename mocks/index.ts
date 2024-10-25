async function initMocksServer() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  if (typeof window === "undefined") {
    console.log("Server-side initialization of MSW");
    const { server } = await import("./server");
    server.listen({
      onUnhandledRequest: "warn",
    });
  } else {
    console.log("Client-side initialization of MSW");
    const { worker } = await import("./browser");
    await worker.start({
      waitUntilReady: true,
    });
  }
}

export default initMocksServer;
