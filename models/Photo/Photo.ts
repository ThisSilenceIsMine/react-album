export interface IPhotoWrapper {
  src: string;
  width: number;
  height: number;
  file?: File;
  createdAt?: number;
  title?: string;
  description?: string;
}

export class PhotoWrapper implements IPhotoWrapper {
  constructor(
    public src: string,
    public width: number,
    public height: number,
    public file?: File,
    public createdAt?: number,
    public title?: string,
    public description?: string
  ) {}

  setProperties(properties: Partial<PhotoWrapper>) {
    Object.assign(this, properties);
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
    return new Promise<PhotoWrapper>((resolve) => {
      PhotoWrapper.getImageDimensions(src).then((dimensions) => {
        resolve(new PhotoWrapper(src, dimensions.width, dimensions.height));
      });
    });
  }

  static fromFile(file: File) {
    return new Promise<PhotoWrapper>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        PhotoWrapper.getImageDimensions(reader.result as string).then(
          (dimensions) => {
            resolve(
              new PhotoWrapper(
                reader.result as string,
                dimensions.width,
                dimensions.height,
                file
              )
            );
          }
        );
      };
      reader.onerror = () => {
        reject(new Error('Could not load image'));
      };
      reader.readAsDataURL(file);
    });
  }
}
