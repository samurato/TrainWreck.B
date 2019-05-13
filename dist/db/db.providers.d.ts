export declare const dbProviders: {
    provide: string;
    useFactory: () => Promise<import("typeorm").Connection>;
};
