# Jérémy Spieldenner - Code Challenge

## Technologie

J'ai décidé de faire ce challenge en NodeJs pour plusieurs raisons.
Premièrement, je n'avais pas envie d'utiliser un langage comme le PHP, car pour pouvoir faire un prototype de cette taille, l'utilisation d'un framework aurait été une bonne solution si on souhaite maintenir le projet et le faire évoluer. L'incovénient est qu'il aurait fallu mettre tout le framework en place, ainsi qu'un serveur local, etc. De plus, je suis plus à l'aise avec le PHP et je voulais montrer que j'étais capable de m'adapter rapidement.
Une deuxième solution aurait pu être en React, cependant cela est une technologie vraiment différente de ce à quoi j'avais l'habitude de travailler, et j'ai donc décidé de le remettre à plus tard. J'ai préféré jouer la sécurité sur ce coup afin de m'assurer d'avoir un rendu final fonctionnel.
NodeJS est venu naturellement comme solution. J'avais l'envie de faire un projet en JavaScript depuis quelques temps afin de me casser les temps comme il faut dessus (c'est chose faite avec une première rencontre avec les Promises). NodeJS facilite grandement le départ d'un projet car elle ne demande pas grand chose. Cependant, il nous force à adopter une structure par nous même sinon cela peut vite devenir un amas de fichier à la racine.

## Expérience en NodeJS

Je n'avais aucune expérience en NodeJS, ni une très grande en JavaScript (uniquement des bouts de codes pour faire du cosmétique sur un site web). C'était cependant moins pénalisant que je ne pensais. Le langage se prend bien en main et les habitudes sont revenues rapidement.

## Cheminement

Après avoir reçu le projet, j'ai passé mon après-midi à me remettre à jour en JavaScript en relisant des articles sur ES6. J'ai visionné des tutoriels de NodeJS sur le fonctionnement général et basique de l'outil. J'ai fait quelques sandbox et plannifié petit à petit les tâches que j'allais réalisé. J'ai attaqué la partie code du projet le lendemain.

Voici la liste grossière des tâches:

- Avoir une entrée de requêtes
- Récupérer les données et créer la structure de la ninjification
- Gérer d'une manière simple la persistence des données (tableau)
- Faire une requête de nom à une API de génération (Randommer.io)
- Faire une interface simple
- Vérifier la normalisation des données, et certains cas d'erreurs.
- Créer une base de données en MongoDB (pour une maintenabilité plus adéquate des données)

## Problèmes rencontrés

Le principal problème rencontré a été lorsque j'effectue la requête vers l'API Randommer afin d'obtenir un nom. Je voulais à la base faire une requête renvoyant un nom généré dès que le buzzwords n'avait pas encore était enregistré dans la base de données. J'ai n'ai pas réussi à passer mon resultat de la requête faite avec 'fetch' au contrôleur gérant la ninjification du à l'asynchronicité du langage. J'ai laissé le problème dans la branche 'async-request-name'. J'ai donc contourné ce problème en ayant une autre approche et en me servant des capacités de l'API Randommer en me créant un tableau de nom et en le gérant côté serveur.

## Analyse

Le retour dans le domaine de l'informatique a été moins effrayant que je ne pensais. Beaucoup d'automatisme et de façon de penser reviennent rapidement. Les commandes git et UNIX en général sont comme le vélo, elles ne s'oublient pas. La deuxième journée a déjà été meilleure que la première en terme d'efficacité. Je prenais plus confiance en ce que je codais, j'avais besoin de faire moins de vérification chronophage.
