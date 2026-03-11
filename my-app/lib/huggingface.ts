// // /lib/caption.ts
// import { pipeline } from "@xenova/transformers";

// // Cache en mémoire pour éviter de recalculer les captions
// const cache = new Map<string, string>();

// let captioner: any = null;

// export async function generateCaption(imageUrl: string) {
//   // Retourner le cache si disponible
//   if (cache.has(imageUrl)) {
//     return cache.get(imageUrl)!;
//   }

//   // Initialiser le modèle au premier appel
//   if (!captioner) {
//     captioner = await pipeline(
//       "image-to-text",
//       "Xenova/vit-gpt2-image-captioning"
//     );
//   }

//   // Générer la caption
//   const result = await captioner(imageUrl);

//   const caption = Array.isArray(result)
//     ? result[0].generated_text
//     : result.generated_text;

//   // Sauvegarder dans le cache
//   cache.set(imageUrl, caption);

//   return caption;
// }