export type Service = {
  id: string;
  name: string;
  description: string;
  image: string;
};

export const services: Service[] = [
  {
    id: "kronos-care",
    name: "Kronos Care Business2",
    description: "Cybersecurity e gestione IT per proteggere dati e continuità operativa.",
    image: "/services/kronos-care.png",
  },
  {
    id: "microsoft-365",
    name: "Microsoft 365",
    description:
      "Soluzione cloud per produttività, collaborazione e sicurezza dei dati.",
    image: "/services/microsoft-365.png",
  },
  {
    id: "google-workspace",
    name: "Google Workspace",
    description:
      "Comunicazioni aziendali stabili e sicure, con gestione di rete, hosting e domini.",
    image: "/services/google-workspace.png",
  },
];
