package eramus.visiton.mobile.app.retrofit.services;

import eramus.visiton.mobile.app.model.Category;
import eramus.visiton.mobile.app.responses.ResponseContainer;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;


public interface CategoryService {

    String BASE_URL = "/categories";

    @GET(BASE_URL)
    Call<ResponseContainer<Category>> listCategories();

    @GET(BASE_URL + "/{id}")
    Call<Category> getCategory(@Path("id") Long id);
}
