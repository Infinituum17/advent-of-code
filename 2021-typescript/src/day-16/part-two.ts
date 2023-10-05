import { Packet } from "./part-one";

export class AdvancedDecoder {
  static mappedHex = new Map().set("0", "0000").set("1", "0001").set("2", "0010").set("3", "0011").set("4", "0100").set("5", "0101").set("6", "0110").set("7", "0111").set("8", "1000").set("9", "1001").set("A", "1010").set("B", "1011").set("C", "1100").set("D", "1101").set("E", "1110").set("F", "1111");

  public static decode(hex: string): AdvancedPacket {
    let bits = this.hexToBits(hex);

    return this.decodePacket(bits)[0];
  }

  private static decodePacket(bits: string): [AdvancedPacket, string] {
    const [version, typeId] = this.getHeader(bits);
    bits = bits.slice(6);

    const content = this.getContent(bits, typeId);

    return [new AdvancedPacket(version, typeId, content[0]), content[1]];
  }

  private static getContent(bits: string, typeId: number): [AdvancedPacket[] | string[], string] {
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

      const packetBuffer: AdvancedPacket[] = [];

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

    for(const c of hex) bits += AdvancedDecoder.mappedHex.get(c);

    return bits;
  }
}

export class AdvancedPacket {
  constructor(public version: number, public typeId: number, public content: AdvancedPacket[] | string[]) {}

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

    return this.version + (this.content as AdvancedPacket[]).reduce((acc, p) => p.getVersionSum() + acc, 0)
  }

  public evaluate(): number {
    switch (this.typeId) {
      case 0: 
        return (this.content as AdvancedPacket[]).reduce((acc, p) => p.evaluate() + acc, 0);
      case 1: 
        return (this.content as AdvancedPacket[]).reduce((acc, p) => p.evaluate() * acc, 1);
      case 2:
        return Math.min(...(this.content as AdvancedPacket[]).map(p => p.evaluate()))
      case 3:
        return Math.max(...(this.content as AdvancedPacket[]).map(p => p.evaluate()))
      case 4: {
        let buf = "";

        for(const v of (this.content as string[])) {
          buf += v.slice(1);
        }

        return parseInt(buf, 2);
      }
      case 5: {
        const val1 = (this.content as AdvancedPacket[])[0].evaluate();
        const val2 = (this.content as AdvancedPacket[])[1].evaluate();
        return (val1 > val2) ? 1 : 0;
      }
      case 6: {
        const val1 = (this.content as AdvancedPacket[])[0].evaluate();
        const val2 = (this.content as AdvancedPacket[])[1].evaluate();
        return (val1 < val2) ? 1 : 0;
      }
      case 7: {
        const val1 = (this.content as AdvancedPacket[])[0].evaluate();
        const val2 = (this.content as AdvancedPacket[])[1].evaluate();
        return (val1 == val2) ? 1 : 0;
      }
      
      default: return -1;
    }
  }
}