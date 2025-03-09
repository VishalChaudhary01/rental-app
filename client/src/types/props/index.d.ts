declare interface IDiscoverCardProps {
  title: string;
  description: string;
  imgSrc: string;
}

declare interface IFeatureCardProps extends IDiscoverCardProps {
  linkText: string;
  linkHref: string;
}
