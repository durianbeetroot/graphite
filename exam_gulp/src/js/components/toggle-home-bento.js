export default class HomeBentoToggle {
  constructor(element) {
    /**
     * Component main element.
     * @type {!Element}
     */
    this.element_ = element;
    this.targetId_ = this.element_.getAttribute("data-target");
    this.target_ = document.querySelector(this.targetId_);
    this.activeClass_ = this.target_.getAttribute("data-active-class").split(" ");

    // Add reference to navigation buttons
    this.toggleContainer_ = element.closest("[data-bento-element=\"container\"]");
    this.navButtons_ = this.toggleContainer_.querySelectorAll("[data-swiper-action]");
    this.listElement_ = this.toggleContainer_.querySelector("[data-bento-element=\"list\"]");
    this.cardElement_ = this.toggleContainer_.querySelector("[data-bento-element=\"card\"]");

    /**
     * Binds functions.
     */
    this.initialize_ = this.initialize_.bind(this);
    this.toggle_ = this.toggle_.bind(this);

    this.initialize_();
  }

  /**
   * Initializes the component.
   * @private
   */
  initialize_() {
    this.element_.addEventListener("click", this.toggle_);
  }

  /**
   * Toggles the search overlay's visibility and navigation buttons.
   * @private
   */
  toggle_() {
    this.activeClass_.forEach(className => {
      this.target_.classList.toggle(className);
    });

    // Toggle navigation buttons visibility
    this.navButtons_.forEach(button => {
      button.classList.toggle("notshow");
    });

    // Toggle list/card elements visibility
    this.listElement_.classList.toggle("hidden");
    this.cardElement_.classList.toggle("hidden");
  }
}