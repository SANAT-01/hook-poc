import mixpanel from "mixpanel-browser";

export class MixpanelTracking {
  private static _instance: MixpanelTracking;

  public static getInstance(): MixpanelTracking {
    if (!MixpanelTracking._instance) {
      MixpanelTracking._instance = new MixpanelTracking();
    }
    return MixpanelTracking._instance;
  }

  private constructor() {
    if (MixpanelTracking._instance) throw new Error("Already instantiated");

    mixpanel.init(
      process.env.NEXT_MIXPANEL_PUBLIC_TOKEN ??
        "a6976a779862c7d872c372821d57b021",
      {
        debug: true,
        // track_pageview: true,
        persistence: "localStorage",
      }
    );
  }

  /** Identify user */
  public identifyUser(userId: string, name: string, email: string) {
    mixpanel.identify(userId);
    mixpanel.people.set({
      $name: name,
      $email: email,
      plan: "Premium", // Example property, you can add more
    });
  }

  /** Track events */
  public track(name: string, data: object = {}) {
    mixpanel.track(name, data);
  }

  public pageViewed() {
    this.track("Page Viewed");
  }
}
