import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  public uploadImageAsync(image: File): Promise<File>{
    const formData = new FormData();
    formData.append('image', image, image.name);
    return this.http.post<File>(baseUrl+ "/api/upload-image", formData).toPromise();
    
  }

  public deleteImageAsync(imageName: string): Promise<void>{
    return this.http.delete<void>(baseUrl+ "/api/upload-image/"+ imageName).toPromise();
  }

}
