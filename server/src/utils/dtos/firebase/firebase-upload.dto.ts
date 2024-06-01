export type FirebaseUploadDto = {
    image: Express.Multer.File,
    imageName?: string,
    endpoint: string,
}