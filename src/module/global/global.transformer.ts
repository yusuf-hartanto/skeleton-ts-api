'use strict';

export default class Transformer {
  public list(data: any) {
    return data.map((item: any) => ({
      id: item?.id,
      category_name: item?.category_name,
      title: item?.title,
      slug: item?.slug,
      description: item?.description,
      path_thumbnail: item?.path_thumbnail,
      path_image: item?.path_image,
      status: item?.status,
      counter_view: item?.counter_view,
      counter_share: item?.counter_share,
      counter_like: item?.counter_like,
      counter_comment: item?.counter_comment,
      created_by: item?.created_by,
      created_date: item?.created_date,
      modified_by: item?.modified_by,
      modified_date: item?.modified_date,
      like: item?.user_like > 0,
      author: {
        resource_id: item?.created_by,
        username: item?.username,
        full_name: item?.full_name,
        image_foto: item?.image_foto,
      },
    }));
  }
}

export const transformer = new Transformer();
