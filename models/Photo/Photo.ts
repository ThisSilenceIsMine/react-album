export class Photo {
  constructor(
    public src: string,
    public width: number,
    public height: number,
    public title?: string
  ) {}

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  static getImageDimensions(src: string) {
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        reject(new Error('Could not load image'));
      };
      img.src = src;
    });
  }

  static async fromUrl(url: string) {
    const dimensions = await Photo.getImageDimensions(url);
    return new Photo(url, dimensions.width, dimensions.height);
  }

  static fromFile(file: File) {
    return new Promise<Photo>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        Photo.getImageDimensions(reader.result as string).then((dimensions) => {
          resolve(
            new Photo(
              reader.result as string,
              dimensions.width,
              dimensions.height
            )
          );
        });
      };
      reader.onerror = () => {
        reject(new Error('Could not load image'));
      };
      reader.readAsDataURL(file);
    });
  }
}
