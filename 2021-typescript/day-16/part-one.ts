export class Decoder {
  static mappedHex = new Map().set("0", "0000").set("1", "0001").set("2", "0010").set("3", "0011").set("4", "0100").set("5", "0101").set("6", "0110").set("7", "0111").set("8", "1000").set("9", "1001").set("A", "1010").set("B", "1011").set("C", "1100").set("D", "1101").set("E", "1110").set("F", "1111");

  public static decode(hex: string): Packet {
    let bits = this.hexToBits(hex);

    return this.decodePacket(bits)[0];
  }

  private static decodePacket(bits: string): [Packet, string] {
    const [version, typeId] = this.getHeader(bits);
    bits = bits.slice(6);

    const content = this.getContent(bits, typeId);

    return [new Packet(version, typeId, content[0]), content[1]];
  }

  private static getContent(bits: string, typeId: number): [Packet[] | string[], string] {
    if(typeId == 4) {
      let content: string[] = [];

      while(bits[0] != "0") {
        content.push(bits.slice(0, 5));
        bits = bits.slice(5);
      }

      content.push(bits.slice(0, 5));
      bits = bits.slice(5);

      return [content, bits];
    } else {
      const lengthTypeId = bits.slice(0, 1);
      bits = bits.slice(1);

      const packetBuffer: Packet[] = [];

      if(lengthTypeId == "0") {
        let length = parseInt(bits.slice(0, 15), 2);
        bits = bits.slice(15);

        while(length > 0) {
          const [packet, nextBits] = this.decodePacket(bits);

          length -= bits.length - nextBits.length;

          if(length < 0) {
            packet.trimRight(-length);
          } else packetBuffer.push(packet);

          bits = nextBits;
        }

        return [packetBuffer, bits];
      } else if(lengthTypeId == "1") {
        let count = parseInt(bits.slice(0, 11), 2);
        bits = bits.slice(11);

        while(count > 0) {
          const [packet, nextBits] = this.decodePacket(bits);
          packetBuffer.push(packet);
          bits = nextBits;
          
          count--;
        }

        return [packetBuffer, bits];
      } else {
        throw new Error("Invalid 'lengthTypeId'");
      }
    }
  }

  private static getHeader(bits: string): [number, number] {
    return [parseInt(bits.slice(0, 3), 2), parseInt(bits.slice(3, 6), 2)];
  }

  private static hexToBits(hex: string) {
    let bits = "";

    for(const c of hex) bits += Decoder.mappedHex.get(c);

    return bits;
  }
}

export class Packet {
  constructor(public version: number, public typeId: number, public content: Packet[] | string[]) {}

  public trimRight(n: number) {
    if(typeof this.content[0] == "string") {
      const lastData = this.content[this.content.length - 1] as string;
      this.content[this.content.length - 1] = lastData.slice(lastData.length - n - 1, lastData.length);
    } else {
      this.content[this.content.length - 1].trimRight(n);
    }
  }

  public getVersionSum(): number {
    if(typeof this.content[0] == 'string') return this.version;

    return this.version + (this.content as Packet[]).reduce((acc, p) => p.getVersionSum() + acc, 0)
  }
}