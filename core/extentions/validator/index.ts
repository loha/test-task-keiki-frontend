class Validator {
  public static isCarPlateNumber(value: string): boolean {
    return /^[0-9 A-Z]{7,15}$/.test(value);
  }

  public static isInteger(value: any): boolean {
    value = value.toString();

    return /^[0-9]+$/.test(value);
  }

  public static isFloat(value: string): boolean {
    value = value.toString();

    return /^[0-9]+.[0-9]+$/.test(value);
  }
}

export { Validator };
