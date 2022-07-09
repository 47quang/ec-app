import RecipeService from '../../apis/recipe/recipe.service';
interface RecipeData {
  id: string;
  recipe: any;
  tabs: any[];
  recipeTab: number;
}
interface RecipeMethods {
  parseParams(): any;
  onTabChange(params: any): any;
  onTabClick(params: any): any;
}

Page<RecipeData, RecipeMethods>({
  data: {
    id: '',
    recipe: {},
    tabs: [
      {
        title: 'Chế biến',
      },
      {
        title: 'Nguyên liệu',
      },
    ],
    recipeTab: 0,
  },
  // @ts-ignore ==> test ts ignore flag
  async onLoad(query: string) {
    const [, id] = query.split('=');

    const recipe: any = await RecipeService.getRecipeById(id);

    recipe.tags = recipe.tags.concat(recipe.tags);

    recipe.products = [
      {
        id: 12345,
        sku: '8935086810576',
        name: 'Hạt Giống Tâm Hồn 1- Kèm CD',
        master_id: 324683,
        master_sku: '2438445414768',
        super_id: 0,
        active: 1,
        is_hidden: false,
        type: 'simple',
        entity_type: 'seller_simple',
        price: 27000,
        market_price: 27000,
        version: 45,
        created_at: '2017-02-25 21:14:25',
        updated_at: '2021-02-04 10:01:01',
        thumbnail: 'https://uat.tikicdn.com/cache/280x280/ts/h/g/hgth_-_1_1.jpg',
        seller: {
          id: 1,
          name: 'Tiki Trading',
          code: 'TIKI',
          logo: 'http://uat.tikicdn.com/ts/seller/0e/9d/fd/61dfb9c92f03fefbb799e829e4b54e67.jpg',
          slug: 'tiki',
          status: 1,
          store_id: 1,
          listdata_id: 632463,
          vat_limit_supported: 0,
          is_all_vat_supported: 0,
        },
        attributes: {
          price_restore: 14000,
          small_image: '/h/g/hgth_-_1_1.jpg',
          plastic_cover_suitable: 1,
          support_p24h: 0,
          gift_message_available: '4',
          custom_design: '4',
          specifications: [
            {
              id: 2077,
              name: 'General',
              attributes: [
                {
                  id: 59,
                  code: 'sku',
                  name: 'Sku',
                  display_name: 'SKU',
                  data_type: 'static',
                  input_type: 'text',
                  value: '8935086810576',
                },
              ],
              sort_order: 1,
            },
            {
              id: 2079,
              name: 'Thông tin chi tiết',
              attributes: [
                {
                  id: 497,
                  code: 'dimensions',
                  name: 'Kích thước',
                  display_name: 'Kích thước',
                  data_type: 'text',
                  input_type: 'textarea',
                  value: '13 x 20.5',
                },
              ],
              sort_order: 3,
            },
          ],
          cover: 'Bìa mềm',
          price: 27000.0,
          supplier: {
            id: 1453707,
            value: ' CÔNG TY CỔ PHẦN HỒNG LAM',
          },
          special_from_date: '2017-02-17T09:22:00.000+00:00',
          image: '/h/g/hgth_-_1_1.jpg',
          enable_googlecheckout: 1,
          thumbnail: '/h/g/hgth_-_1_1.jpg',
          small_image_label: '4',
          meta_title: 'Hạt giống tâm hồn tập 1 - Kèm CD | Original',
          visibility: 3,
          support_cod: 1,
          author: '4043',
          vat: {
            id: 1461703,
            value: '0',
          },
          weight: 2000,
          rma_status: 1331477,
          thumbnail_label: '4',
          is_free_gift: 1305065,
          require_expiry_date: 0,
          meta_description:
            'Hạt Giống Tâm Hồn 1- Kèm CD - Hạt Giống Tâm Hồn Tập 1 - Cho Lòng Dũng Cảm và Tình Yêu Cuộc Sống“Thân tặng tất cả những người đang trăn trở, đang vượt qua những khó khăn, ... | Original',
          unit: {
            id: 1461637,
            value: '292769',
          },
          number_of_page: '168',
          meta_keyword: 'Hạt giống tâm hồn tập 1 - Cho lòng dũng cảm và tình yêu cuộc sống, Kèm CD',
          name: 'Hạt Giống Tâm Hồn 1- Kèm CD',
          image_label: '4',
          translated_by: 'First News',
          location_number: '4',
          status: 1,
          edition: '4',
          description: `<p style="text-align: justify;" _mce_style="text-align: justify;"><strong>Hạt Giống Tâm Hồn Tập 1 - Cho Lòng Dũng Cảm và Tình Yêu Cuộc Sống</strong><br></p><p style="text-align: justify;" _mce_style="text-align: justify;"><span style="font-size: small;" _mce_style="font-size: small;"><em>“Thân tặng tất cả những người đang trăn trở, đang vượt qua những khó khăn, thử thách tinh thần và niềm tin trong cuộc sống để đạt được ước mơ của mình”.</em></span> </p><p style="text-align: justify;" _mce_style="text-align: justify;"><span _mce_style="font-size: small;" style="font-size: small;">Cuộc sống chúng ta ra sao, luôn ngập tràn sợ hãi và oán hờn hay chấp nhận và vui sống để vươn lên sẽ tùy thuộc vào cách ta đối mặt với những khó khăn thử thách ta gặp trên con đường như thế nào.</span></p>rn<p style="text-align: justify;" _mce_style="text-align: justify;"><span style="font-size: small;" _mce_style="font-size: small;">Hai tập <em>“ <strong>Hạt giống tâm hồn cho lòng dũng cảm và tình yêu cuộc sống</strong>”</em> do First News thực hiện trong bộ sách <em>Hạt giống tâm hồn </em>này sẽ là người bạn đồng hành cùng độc giả vượt qua những khó khăn thử thách trong cuộc sống thường ngày như nỗi mất mát, nỗi đau tổn thương tinh thần, tình cảm, niềm tin, bệnh tật, những thăng trầm trên bước đường theo đuổi ước mơ của cuộc đời hay vươn lên cho cuộc sống tốt đẹp hơn.</span></p>rn<p style="text-align: justify;" _mce_style="text-align: justify;"><span style="font-size: small;" _mce_style="font-size: small;">Qua những sự kiện bất hạnh, những câu chuyện bình thường, những người bình dị, các câu chuyện đều nhấn mạnh đến tinh thần vượt lên, chiến thắng chứ không phải những điều lạ thường. bạn có thể bắt gặp câu chuyện của chính mình, của những người xung quanh hay của những người hoàn toàn xa lạ... để suy gẫm, chiêm nghiệm, khám phá và tìm thấy câu châm ngôn cuộc sống của mình!</span></p><p style="text-align: justify;" _mce_style="text-align: justify;"><span style="font-size: small;" _mce_style="font-size: small;"><strong>Mời bạn đón đọc.</strong><br></span></p>`,
          giftwrap: 1,
          bao_sach_kho: 20750,
          page_layout: '4',
          publication_date: '2008-03-31T07:00:00.000+00:00',
          is_recurring: 0,
          special_to_date: '2017-02-28T23:59:00.000+00:00',
          options_container: 'container2',
          url_path: 'h-t-gi-ng-tam-h-n-1-kem-cd-p324683.html',
          subtitles: '10947',
          cost: 0.0,
          publisher_vn: 1329031,
          is_fresh: 0,
          url_key: 'h-t-gi-ng-tam-h-n-1-kem-cd-p324683',
          po_type: 1329021,
          manufacturer_book_vn: 1327858,
          special_price: 27000.0,
          dimensions: '13 x 20.5',
        },
        images: [
          {
            id: 12348871,
            url: 'https://uat.tikicdn.com/ts/h/g/hgth_-_1_1.jpg',
            path: '/h/g/hgth_-_1_1.jpg',
            position: 1,
          },
        ],
        categories: [
          {
            id: 2,
            name: 'Root yyy',
            url_key: 'default-category',
            is_primary: false,
          },
          {
            id: 316,
            name: 'Sách Tiếng Việt',
            url_key: 'sach-tieng-viet',
            is_primary: true,
          },
        ],
        inventory: {
          inventory_type: 'instock',
          fulfillment_type: 'tiki_delivery',
          quantity: 20,
          quantity_available: 0,
          quantity_reserved: -20,
          quantity_sellable: 20,
        },
      },
    ];

    recipe.products = recipe.products.concat(recipe.products, recipe.products);

    this.setData({ recipe, id });
  },

  onTabClick({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  onTabChange({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
});
