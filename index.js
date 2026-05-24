import { Server } from "socket.io";

const SERVER_PORT = 9000;

const main = () => {
	const socketServer = new Server();

	serverListeners(socketServer);

	console.log(`Socket.IO server is running on port ${SERVER_PORT}`);
	socketServer.listen(SERVER_PORT);
};

const serverListeners = (socketServer) => {
	socketServer.on("connection", (socket) => {
		console.log(`A client connected: ${socket.id}`);

		setTimeout(() => {
			socket.emit("initialize", {
				servers: getServers(),
				units: getMetrics(),
			});
		}, 10000);
	});
};

const getServers = () => {
	const servers = [];

	for (let i = 0; i < 5; i++) {
		const number = i + 1;
		servers.push({
			name: `SRV-${number}`,
			host: `172.27.0.${Math.ceil(Math.random() * 252 + 1)}`,
			port: 8000 + Math.ceil(Math.random() * 1000),
		});
	}
	return servers;
};

const getMetrics = () => {
	return [
		{
			name: "uso de CPU",
			code: "CPU_USAGE",
			unit: "%",
		},
		{
			name: "uso de RAM",
			code: "RAM_USAGE",
			unit: "MB",
		},
		{
			name: "uso de disco",
			code: "DISK_USAGE",
			unit: "MB",
		},
		{
			name: "uso de red",
			code: "NET_USAGE",
			unit: "MB/s",
		},
	];
};

main();
