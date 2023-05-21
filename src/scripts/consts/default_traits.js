/**
 * Default monster traits.
 */
const DEFAULT_TRAITS = [
  {
    id: 0,
    role: "controller",
    name: "Recul",
    description:
      "Réduisez de moitié les dégâts de votre attaque pour faire reculer la cible jusqu'à 15 ft. (3 cases)",
  },
  {
    id: 1,
    role: "controller",
    name: "Distraction",
    description:
      "Réduisez de moitié les dégâts de votre attaque pour accorder l'avantage au prochain jet d'attaque effectué contre la cible.",
  },
  {
    id: 2,
    role: "controller",
    name: "Se mettre en position",
    description:
      "Réduisez de moitié les dégâts de votre attaque pour permettre à un allié de dépenser sa réaction et de se déplacer de la moitié de sa vitesse (sans provoquer d'attaque d'opportunité de la part de la cible initiale).",
  },
  {
    id: 3,
    role: "controller",
    name: "Pas de côté",
    description:
      "Réduisez de moitié les dégâts de votre attaque pour vous déplacer, vous et votre cible, de 5 ft. (1 case) dans n'importe quelle direction.",
  },
  {
    id: 4,
    role: "controller",
    name: "Frappe paralysante",
    description:
      "Réduisez de moitié les dégâts de votre attaque pour réduire la vitesse de votre cible à 0ft jusqu'au début de votre prochain tour",
  },
  {
    id: 5,
    role: "defender",
    name: "Défense lourde",
    description: "Votre défense est impénétrable. Gagnez +2 de défense.",
  },
  {
    id: 6,
    role: "defender",
    name: "J'assure vos arrières",
    description:
      "Lorsque vous êtes à côté d'un allié ou d'une cible attaquante, vous pouvez dépenser votre réaction pour rediriger l'attaque sur vous",
  },
  {
    id: 7,
    role: "defender",
    name: "Pas un pas de plus",
    description:
      "Les cibles provoquent toujours des attaques d'opportunité, même si elles entreprennent l'action 'Se désengager' avant de quitter votre zone d'allonge. De plus, lorsque vous touchez avec une attaque d'opportunité, la vitesse de la cible devient 0 pour le reste du tour",
  },
  {
    id: 8,
    role: "defender",
    name: "Derrière moi",
    description:
      "Les alliés situés à moins de 5 ft de vous comptent comme étant à couvert trois-quarts",
  },
  {
    id: 9,
    role: "defender",
    name: "Ne détournez pas le regard",
    description:
      "Lorsque vous attaquez une cible, vous pouvez la marquer. Une cible marquée a -2 à tous les jets d'attaque qui ne vous incluent pas. Vous ne pouvez avoir qu'une seule marque active à la fois, et les marques ne s'additionnent pas",
  },
  {
    id: 10,
    role: "lurker",
    name: "Se cacher à la vue de tous",
    description:
      "Vous pouvez tenter de vous cacher lorsque vous êtes à l'abris, même léger",
  },
  {
    id: 11,
    role: "lurker",
    name: "Coup en embuscade",
    description:
      "Si vous avez l'avantage sur votre attaque, ajoutez votre niveau en dégâts supplémentaires",
  },
  {
    id: 12,
    role: "lurker",
    name: "Fuite agile",
    description:
      "Vous pouvez foncer, vous désengager ou vous cacher en tant qu'action bonus",
  },
  {
    id: 13,
    role: "lurker",
    name: "Camouflage",
    description:
      "Lorsque vous êtes caché, les ennemis ne peuvent pas vous repérer avec leur perception passive et ils ont un désavantage lorsqu'ils font des tests actifs pour vous trouver",
  },
  {
    id: 14,
    role: "lurker",
    name: "Guerilla",
    description:
      "Lorsque vous effectuez une attaque alors que vous êtes caché, vous ne vous dévoilez pas et pouvez rester caché",
  },
  {
    id: 15,
    role: "sniper",
    name: "Ne bougez pas",
    description:
      "Vous avez l'avantage sur les jets d'attaque lorsque votre cible s'est déplacée de moins de 15 ft lors de son dernier tour",
  },
  {
    id: 16,
    role: "sniper",
    name: "Je te vois",
    description:
      "Vos attaques à distance ignorent la demi-couverture et la couverture aux trois quarts",
  },
  {
    id: 17,
    role: "sniper",
    name: "La prochaine fois",
    description:
      "Si vous manquez une cible, vous avez l'avantage sur votre prochaine attaque contre cette même cible",
  },
  {
    id: 18,
    role: "sniper",
    name: "Tir en rafale",
    description:
      "Lorsque vous réussissez une attaque, vous pouvez infliger des dégâts égaux à votre niveau à toute personne se trouvant à moins de 5 ft de votre cible (une fois par round)",
  },
  {
    id: 19,
    role: "sniper",
    name: "Ricochet",
    description:
      "Si votre attaque rate, vous pouvez dépenser votre réaction pour effectuer une autre attaque contre une cible différente de votre choix dans un rayon de 15 ft de la cible initiale",
  },
  {
    id: 20,
    role: "striker",
    name: "Tourbillon",
    description:
      "Vous pouvez attaquer deux cibles adjacentes qui sont à portée, en leur infligeant à chacune des dégâts complets",
  },
  {
    id: 21,
    role: "striker",
    name: "Furie sanguinaire",
    description:
      "Lorsque vous êtes dans l'état 'Saignement', vous devenez enragé ; -2 de défense et +2 d'attaque",
  },
  {
    id: 22,
    role: "striker",
    name: "Assaut sauvage",
    description:
      "Une fois par tour, ajoutez votre niveau en dégâts supplémentaires à une attaque",
  },
  {
    id: 23,
    role: "striker",
    name: "Attaque soutenue",
    description:
      "Vous avez l'avantage sur les jets d'attaque contre les cibles dans l'état 'Saignement' (moins de 50% de points de vie)",
  },
  {
    id: 24,
    role: "striker",
    name: "Vengeance",
    description:
      "Inflige un bonus de dégâts égal à votre niveau à toute personne qui vous a blessé au cours du round précédent",
  },
  {
    id: 25,
    role: "scout",
    name: "Vous ne pouvez pas vous cacher",
    description:
      "Vous avez un avantage lorsque vous essayez de détecter des ennemis cachés. Tout ennemi que vous pouvez voir est également visible par vos alliés",
  },
  {
    id: 26,
    role: "scout",
    name: "Pieds légers",
    description:
      "Vous pouvez vous désengager ou foncer en tant qu'action bonus. Lorsqu'un ennemi se déplace à proximité de vous, vous pouvez dépenser votre réaction pour vous éloigner de la moitié de votre vitesse",
  },
  {
    id: 27,
    role: "scout",
    name: "Explorateur",
    description:
      "Vous pouvez grimper et vous déplacer en terrain difficile sans pénalité de mouvement",
  },
  {
    id: 28,
    role: "scout",
    name: "Opportuniste",
    description:
      "Lorsqu'un allié se déplace à proximité d'un ennemi, vous pouvez dépenser votre réaction pour vous déplacer de votre vitesse vers ce même ennemi",
  },
  {
    id: 29,
    role: "scout",
    name: "Dur à frapper",
    description:
      "Lorsque vous êtes debout et non immobilisé, les attaques contre vous ont un désavantage sauf si vous êtes adjacent à deux ennemis ou plus",
  },
  {
    id: 30,
    role: "supporter",
    name: "Guidance",
    description:
      "Les alliés situés à moins de 10 ft de vous ont un avantage sur leurs jets d'attaque",
  },
  {
    id: 31,
    role: "supporter",
    name: "Protection",
    description:
      "Les alliés dans un rayon de 10 ft autour de vous gagnent +2 de défense.",
  },
  {
    id: 32,
    role: "supporter",
    name: "Ferocity",
    description:
      "Les alliés situés à moins de 10 ft. de vous bénéficient d'un bonus aux dégâts égal à votre niveau",
  },
  {
    id: 33,
    role: "supporter",
    name: "Cri de ralliement",
    description:
      "Réduisez de moitié vos dégâts d'attaque pour supprimer une condition d'un allié",
  },
  {
    id: 34,
    role: "supporter",
    name: "Commandant",
    description:
      "Au lieu de faire un jet d'attaque, vous pouvez ordonner à un allié de faire une attaque contre une cible de votre choix (une fois par round)",
  },
  {
    id: 35,
    role: null,
    name: "Adhésif",
    description:
      "Vous adhérez à tout ce que vous touchez. Toute créature Grande ou plus petite adhérant à vous est également agrippée, et les jets de sauvegardes effectués pour échapper à l'agrippement ont un désavantage",
  },
  {
    id: 36,
    role: null,
    name: "Agressif",
    description:
      "Comme action bonus, vous pouvez vous déplacer de votre vitesse vers un ennemi que vous pouvez voir",
  },
  {
    id: 37,
    role: null,
    name: "Alarme",
    description:
      "Lorsque vous subissez des dégâts, tous les autres monstres de la même race dans un rayon de 75m sont conscients de votre douleur",
  },
  {
    id: 38,
    role: null,
    name: "Esprit extraterrestre",
    description: "Vous avez l'avantage sur les jets de sauvegarde de Sagesse",
  },
  {
    id: 39,
    role: null,
    name: "Amorphe",
    description:
      "Vous pouvez vous déplacer dans un espace aussi étroit qu'un pouce de large sans problème",
  },
  {
    id: 40,
    role: null,
    name: "Protection arcanique",
    description: "Vous êtes résistant à tous les dégâts magiques",
  },
  {
    id: 41,
    role: null,
    name: "Aura : Anti-magie",
    description:
      "Toute créature située à moins de 15 ft de vous a un désavantage lorsqu'elle lance des sorts magiques",
  },
  {
    id: 42,
    role: null,
    name: "Aura : Dégats",
    description:
      "L'espace qui vous entoure est dangereux. Les créatures subissent des dégâts égaux à votre niveau lorsqu'elles pénètrent dans votre aura ou commencent leur tour à l'intérieur de celle-ci.",
  },
  {
    id: 43,
    role: null,
    name: "Aura : Perturbatrice",
    description:
      "Tous les ennemis situés à moins de 10 ft de vous ont un désavantage sur les jets de sauvegarde",
  },
  {
    id: 44,
    role: null,
    name: "Aura : Enchevêtrement",
    description:
      "Le sol dans un rayon de 10 ft autour de vous est un terrain difficile. Chaque créature qui commence son tour dans cette zone doit réussir un jet de sauvegarde de Force ou voir sa vitesse réduite à 0 jusqu'au début de son prochain tour.",
  },
  {
    id: 45,
    role: null,
    name: "Aura : odeur nauséabonde",
    description:
      "L'air est putride autour de vous. Les créatures situées à moins de 10 ft de vous ont un désavantage sur les jets d'attaque, à moins qu'elles n'aient également le don Odeur nauséabonde.",
  },
  {
    id: 46,
    role: null,
    name: "Peau barbelée",
    description:
      "Au début de votre tour, infligez des dégâts perforants égaux à votre niveau à toute créature qui vous agrippe.",
  },
  {
    id: 47,
    role: null,
    name: "Frénésie sanguine",
    description:
      "Vous avez l'avantage sur les jets d'attaque en mêlée contre toute créature qui n'a pas tous ses points de vie",
  },
  {
    id: 48,
    role: null,
    name: "Charger",
    description:
      "Si vous vous êtes déplacé de plus de 20 ft en ligne droite vers votre cible, faites votre jet d'attaque de mêlée avec l'avantage. En cas de succès, vous mettez votre cible à plat ventre, en plus de tout autre effet",
  },
  {
    id: 49,
    role: null,
    name: "Constriction",
    description:
      "Au début de votre tour, infligez des dégâts contondants égaux à votre niveau à toute créature que vous agrippez",
  },
  {
    id: 50,
    role: null,
    name: "Corps corrosif",
    description:
      "Toute créature qui vous touche ou qui porte une attaque de mêlée contre vous subit des dégâts égaux à votre niveau. Toute arme qui vous touche subit une pénalité permanente et cumulative de -1 aux jets d'attaques - l'arme est détruite si la pénalité atteint -5.",
  },
  {
    id: 51,
    role: null,
    name: "Défense critique",
    description:
      "Les coups critiques portés contre vous comptent comme des coups normaux, sauf si vous êtes déjà dans l'était <i>Saignement</i>",
  },
  {
    id: 52,
    role: null,
    name: "Fureur critique",
    description: "Vos attaques obtiennent un coup critique sur un jet de 19-20",
  },
  {
    id: 53,
    role: null,
    name: "Absorption de dégâts",
    description:
      "Chaque fois que vous devriez subir des dégâts d'un type spécifique, vous regagnez à la place ce namebre de points de vie",
  },
  {
    id: 54,
    role: null,
    name: "Transfert de dégâts",
    description:
      "Lorsque vous subissez des dégâts d'une attaque, vous pouvez transférer la moitié de ces dégâts à une autre créature située à moins de 5 pieds de vous",
  },
  {
    id: 55,
    role: null,
    name: "Corps dangereux",
    description:
      "Tout ennemi qui vous touche ou vous frappe avec une attaque de mêlée à moins de 5 ft de vous subit des dégâts égaux à votre niveau",
  },
  {
    id: 56,
    role: null,
    name: "Désintégration",
    description:
      "Lorsque vous mourez, votre corps se désintègre en poussière. Vous laissez derrière vous vos armes et tout ce que vous portez",
  },
  {
    id: 57,
    role: null,
    name: "Souffle du dragon",
    description:
      "Vous pouvez cracher du feu de dragon en attaque, ou l'utiliser pour allumer de petits feux",
  },
  {
    id: 58,
    role: null,
    name: "Glissement sous terrain",
    description:
      "Vous pouvez creuser dans la terre et la pierre non magiques et non travaillées. Ce faisant, vous ne perturbez pas la matière que vous traversez",
  },
  {
    id: 59,
    role: null,
    name: "Evasion",
    description:
      "Lorsque vous devriez être réduit à 0 point de vie en dehors de votre repaire, vous vous échappez et fuyez vers votre repaire. Vous y restez, paralysé et au repos, jusqu'à ce que vous récupériez au moins 50% de vos points de vie",
  },
  {
    id: 60,
    role: null,
    name: "Explosif",
    description:
      "Lorsque vous tombez à 0 point de vie, votre corps explose et inflige des dégâts à tous ceux qui se trouvent à moins de 5 ft. Vous pouvez commencer la détonation à votre tour avec une action bonus ; vous explosez au début de votre prochain tour.",
  },
  {
    id: 61,
    role: null,
    name: "Fausse apparence",
    description:
      "Lorsque vous restez immobile, vous êtes indiscernable d'un morceau du paysage local",
  },
  {
    id: 62,
    role: null,
    name: "Esprit féérique",
    description:
      "Vous avez l'avantage aux jets de sauvegarde contre le charme, et la magie ne peut pas vous endormir",
  },
  {
    id: 63,
    role: null,
    name: "Vol",
    description:
      "Vous pouvez voler à votre vitesse. Lorsque vous volez, vous devez vous déplacer à toute vitesse ou atterrir, à moins que vous ne puissiez également planer. Le fait de se lancer en vol provoque des attaques d'opportunité, même si vous vous désengagez",
  },
  {
    id: 64,
    role: null,
    name: "Survol",
    description:
      "Vous ne provoquez pas d'attaque d'opportunité lorsque vous volez hors de portée d'un ennemi.",
  },
  {
    id: 65,
    role: null,
    name: "Liberté de mouvement",
    description:
      "Vous ignorez les terrains difficiles, et les effets magiques ne peuvent pas réduire votre vitesse ou vous contraindre. Vous pouvez dépenser 5 ft de mouvement pour échapper à des entraves non magiques ou un effet vous aggripant.",
  },
  {
    id: 66,
    role: null,
    name: "Aggrippeur",
    description:
      "Vous avez l'avantage aux jets d'attaque contre toute cible que vous avez agrippée. De plus, lorsque vous agrippez une cible, les dégâts que vous subissez lors d'une attaque sont partagés à 50/50 avec votre victime",
  },
  {
    id: 67,
    role: null,
    name: "Survol",
    description:
      "Vous pouvez rester en vol stationnaire pendant 6 secondes avant de devoir vous déplacer",
  },
  {
    id: 68,
    role: null,
    name: "Immortel",
    description:
      "Vous ne pouvez pas être tué à moins d'être réduit à 0 point de vie par un type d'attaque spécifique. Toute autre forme d'attaque vous réduira à 1 point de vie à la place",
  },
  {
    id: 69,
    role: null,
    name: "Inaltérable",
    description:
      "Vous êtes immunisé contre tout sort ou effet qui modifierait votre forme",
  },
  {
    id: 70,
    role: null,
    name: "Impénétrable",
    description: "Vous êtes résistant à tous les dégâts non magiques",
  },
  {
    id: 71,
    role: null,
    name: "Incorporel",
    description:
      "Vous pouvez traverser toute matière solide non magique et ne pouvez être touché par aucune arme ou attaque non magique",
  },
  {
    id: 72,
    role: null,
    name: "Indomptable",
    description:
      "Vous êtes immunisé contre tout effet qui altérerait votre esprit ou votre volonté",
  },
  {
    id: 73,
    role: null,
    name: "Insondable",
    description:
      "Vous êtes immunisé contre tout effet qui percevrait vos émotions ou lirait vos pensées, ainsi que contre tout sort de divination que vous refusez. Les tests de sagesse (perspicacité) visant à déterminer vos intentions ou votre sincérité sont désavantagés.",
  },
  {
    id: 74,
    role: null,
    name: "Invisible",
    description: "On ne peut pas vous voir",
  },
  {
    id: 75,
    role: null,
    name: "Mangeur de vie",
    description:
      "Lorsque vous infligez des dégâts qui réduisent une créature à 0 point de vie, cette créature ne peut être ranimée par aucun moyen autre qu'un sort de souhait",
  },
  {
    id: 76,
    role: null,
    name: "Résistance à la magie",
    description:
      "Vous avez l'avantage sur les jets de sauvegarde contre les sorts et autres effets magiques",
  },
  {
    id: 77,
    role: null,
    name: "Armes magiques",
    description: "Les attaques de vos armes sont magiques",
  },
  {
    id: 78,
    role: null,
    name: "Avantage martial",
    description:
      "Une fois par tour, vous pouvez infliger des dégâts supplémentaires égaux à votre niveau lorsque vous touchez une cible située à moins de 5 pieds de vos alliés",
  },
  {
    id: 79,
    role: null,
    name: "Parade",
    description:
      "Vous pouvez dépenser votre réaction pour gagner +3 de défense contre une attaque de mêlée que vous pouvez voir",
  },
  {
    id: 80,
    role: null,
    name: "Carnage",
    description:
      "Lorsque vous réduisez une cible à 0 point de vie avec une attaque de mêlée à votre tour, vous pouvez dépenser une action bonus pour vous déplacer jusqu'à la moitié de votre vitesse et attaquer une cible différente",
  },
  {
    id: 81,
    role: null,
    name: "Imprudent",
    description:
      "Au début de votre tour, vous pouvez bénéficier d'un avantage sur toutes les attaques de mêlée que vous effectuez pendant ce tour. Cependant, toutes les attaques contre vous gagnent un avantage jusqu'au début de votre prochain tour",
  },
  {
    id: 82,
    role: null,
    name: "Redirection",
    description:
      "Lorsque vous êtes à moins de 5ft d'un allié, vous pouvez rediriger toute attaque unique faite contre vous vers votre allié à la place",
  },
  {
    id: 83,
    role: null,
    name: "Régénération",
    description:
      "Vous regagnez au début de votre tour un namebre de points de vie égal à 2 ou votre maximum de points de vie / 3 (le plus élevé). Cette régénération s'arrête pendant 1 tour si vous êtes touché par un type de dégât spécifique (feu/acide/foudre/etc) ou si vous êtes réduit à 0 point de vie",
  },
  {
    id: 84,
    role: null,
    name: "Implacable",
    description:
      "La première fois que vous tombez à 0 point de vie après un repos long, vous êtes à la place réduit à 1 point de vie",
  },
  {
    id: 85,
    role: null,
    name: "Monstre de siège",
    description:
      "Vous infligez des dégâts doublés aux objets et aux structures",
  },
  {
    id: 86,
    role: null,
    name: "Ombre furtive",
    description:
      "Dans la pénamebre ou l'obscurité, vous pouvez entreprendre l'action Dissimuler via votre action bonus.",
  },
  {
    id: 87,
    role: null,
    name: "Sournois",
    description: "Vous pouvez <i>Désengager</i> via votre action bonus.",
  },
  {
    id: 88,
    role: null,
    name: "Glissant",
    description:
      "Vous avez l'avantage sur les jets de caractéristiques et les jets de sauvegarde effectués pour eviter de vous faires aggriper.",
  },
  {
    id: 89,
    role: null,
    name: "Pattes d'araignée",
    description:
      "Vous pouvez grimper sur des surfaces difficiles, y compris à l'envers sur les plafonds, sans avoir besoin de faire de jet.",
  },
  {
    id: 90,
    role: null,
    name: "Séparation",
    description:
      "Lorsque vous entrez dans l'état 'Saignement', vous vous séparez en deux copies plus petites. Chaque nouvelle copie a des points de vie égaux à la moitié de vos points de vie restants, et agit de manière indépendante.",
  },
  {
    id: 91,
    role: null,
    name: "Pieds stables",
    description:
      "Vous avez l'avantage sur les jets de sauvegarde de Force et de Dextérité effectués contre les effets qui vous mettraient à terre",
  },
  {
    id: 92,
    role: null,
    name: "Essaim",
    description:
      "Vous pouvez occuper l'espace d'une autre créature et vice versa. Vous gagnez l'avantage sur les attaques contre toute créature qui partage votre espace",
  },
  {
    id: 93,
    role: null,
    name: "Travail d'équipe",
    description:
      "Vous avez l'avantage sur les jets d'attaque lorsque votre cible se trouve à moins de 5ft (1 case) d'un allié non entravé",
  },
  {
    id: 94,
    role: null,
    name: "Sens du danger",
    description:
      "A moins d'être frappé d'incapacité, vous ne pouvez pas être surpris",
  },
  {
    id: 95,
    role: null,
    name: "Force d'âme inaltérable",
    description:
      "Si des dégâts vous réduisent à 0 point de vie, faites un jet de sauvegarde de Constitution avec un DC de 10 + les dégâts subis. En cas de succès, vous tombez à 1 point de vie à la place",
  },
  {
    id: 96,
    role: null,
    name: "Réveillé",
    description: "On ne vous surprend jamais à dormir",
  },
  {
    id: 97,
    role: null,
    name: "Mage de guerre",
    description:
      "Lorsque vous utilisez votre action pour lancer un sort, vous pouvez effectuer une attaque d'arme comme action bonus",
  },
];

export default DEFAULT_TRAITS;
