export class Photo {
  constructor(
    public src: string,
    public width: number,
    public height: number,
    public file?: File,
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

  static fromUrl(src: string) {
    return new Promise<Photo>((resolve, reject) => {
      Photo.getImageDimensions(src).then((dimensions) => {
        resolve(new Photo(src, dimensions.width, dimensions.height));
      });
    });
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
              dimensions.height,
              file
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
