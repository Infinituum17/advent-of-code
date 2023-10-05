import { readLines } from "../src/utils";
import { Decoder, Packet } from "../src/day-16/part-one";
import { AdvancedDecoder, AdvancedPacket } from "../src/day-16/part-two"

describe("Day 16: Packet Decoder", () => {
  test("Part 1: Simple packet", () => {
    const packet = Decoder.decode("D2FE28");

    expect(packet.version).toBe(6);
    expect(packet.typeId).toBe(4);
    expect(packet.content.length).toBe(3);
    expect(packet.content[0]).toBe("10111");
    expect(packet.content[1]).toBe("11110");
    expect(packet.content[2]).toBe("00101");
  });

  test("Part 1: Operator packet (15 bits)", () => {
    const packet = Decoder.decode("38006F45291200");

    expect(packet.version).toBe(1);
    expect(packet.typeId).toBe(6);
    expect(packet.content.length).toBe(2);

    const innerPacket1 = packet.content[0] as Packet;

    expect(innerPacket1.version).toBe(6);
    expect(innerPacket1.typeId).toBe(4);

    const innerPacket1Content = innerPacket1.content;

    expect(innerPacket1Content.length).toBe(1)
    expect(innerPacket1Content[0]).toBe("01010");

    const innerPacket2 = packet.content[1] as Packet;

    expect(innerPacket2.version).toBe(2);
    expect(innerPacket2.typeId).toBe(4);

    const innerPacket2Content = innerPacket2.content;

    expect(innerPacket2Content.length).toBe(2)
    expect(innerPacket2Content[0]).toBe("10001");
    expect(innerPacket2Content[1]).toBe("00100");
  });

  test("Part 1: Operator packet (11 bits)", () => {
    const packet = Decoder.decode("EE00D40C823060");

    expect(packet.version).toBe(7);
    expect(packet.typeId).toBe(3);

    const content = packet.content;

    expect(content.length).toBe(3);

    const packet1 = content[0] as Packet;

    expect(packet1.version).toBe(2);
    expect(packet1.typeId).toBe(4);
    expect(packet1.content.length).toBe(1);
    expect(packet1.content[0]).toBe("00001")

    const packet2 = content[1] as Packet;

    expect(packet2.version).toBe(4);
    expect(packet2.typeId).toBe(4);
    expect(packet2.content.length).toBe(1);
    expect(packet2.content[0]).toBe("00010");

    const packet3 = content[2] as Packet;

    expect(packet3.version).toBe(1);
    expect(packet3.typeId).toBe(4);
    expect(packet3.content.length).toBe(1);
    expect(packet3.content[0]).toBe("00011");
  });

  test("Part 1: Version sum", () => {
    expect(Decoder.decode("8A004A801A8002F478").getVersionSum()).toBe(16);
    expect(Decoder.decode("620080001611562C8802118E34").getVersionSum()).toBe(12);
    expect(Decoder.decode("C0015000016115A2E0802F182340").getVersionSum()).toBe(23);
    expect(Decoder.decode("A0016C880162017C3686B18A3D4780").getVersionSum()).toBe(31);
  });

  test("Part 1", async () => {
    const input = (await readLines("day-16-input"))[0];

    expect(Decoder.decode(input).getVersionSum()).toBe(957);
  });

  test("Part 2: Evaluation", () => {
    expect(AdvancedDecoder.decode("C200B40A82").evaluate()).toBe(3);
    expect(AdvancedDecoder.decode("04005AC33890").evaluate()).toBe(54);
    expect(AdvancedDecoder.decode("880086C3E88112").evaluate()).toBe(7);
    expect(AdvancedDecoder.decode("CE00C43D881120").evaluate()).toBe(9);
    expect(AdvancedDecoder.decode("D8005AC2A8F0").evaluate()).toBe(1);
    expect(AdvancedDecoder.decode("F600BC2D8F").evaluate()).toBe(0);
    expect(AdvancedDecoder.decode("9C005AC2F8F0").evaluate()).toBe(0);
    expect(AdvancedDecoder.decode("9C0141080250320F1802104A08").evaluate()).toBe(1);
  });

  test("Part 2", async () => {
    const input = (await readLines('day-16-input'))[0];

    expect(AdvancedDecoder.decode(input).evaluate()).toBe(744953223228);
  });
});