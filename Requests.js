import os from 'os';
import { exec } from "child_process";

export const getIPv4Address = () => {
    const interfaces = os.networkInterfaces();
    let ipv4Address;

    // Перебираем сетевые интерфейсы
    Object.keys(interfaces).forEach((interfaceName) => {
        const interfaceInfo = interfaces[interfaceName];

        // Перебираем адреса для данного интерфейса
        interfaceInfo.forEach((address) => {
            if (address.family === 'IPv4' && !address.internal) {
                ipv4Address = address.address;
            }
        });
    });

    return ipv4Address;
};

export const LinuxComand = (command) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Ошибка выполнения команды: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Ошибка выполнения команды: ${stderr}`);
            return;
        }
        console.log(`Результат выполнения команды:\n${stdout}`);
    })
}