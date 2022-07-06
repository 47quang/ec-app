Component({
  data: {},
  methods: {
    onOpenPage(e: any) {
      if (e.target.dataset.url) {
        getApp().currentPage = e.target.dataset.url;
        my.navigateTo({
          url: e.target.dataset.url,
        });
      }
    },
  },
});
