Component({
  props: {
    cartId: 0,
    cartQty: 0,
    onUpdate: (_cartId: any, _qty: any) => {},
  },
  methods: {
    onUpdateStepper(e: any) {
      this.props.onUpdate(this.props.cartId, e);
    },
  },
});
