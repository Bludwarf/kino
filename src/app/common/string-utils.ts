export class StringUtils {

  static pad2(i: number): string {
    if (!i) return "00";
    return (i < 10 ? "0" : "") + i;
  }

}
