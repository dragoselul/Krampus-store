import { Product } from "@/model/product";
import ImageCarousel from "@/components/ImageCarousel";
import ProductDescription from "@/components/ProductDescription";
import ClotheSizeSelector from "@/components/ClotheSizeSelector";

type Props = {
  params: Promise<{ productId: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { productId } = await params;
  // fetch your real product here…
  const product: Product & { images: string[] } = {
    id: Number(productId),
    name: `Product ${productId}`,
    description: new Map([
      ["Overview", `Description for product ${productId}`],
      ["Details", `More details about product ${productId}`],
      ["Specifications", `Specifications for product ${productId}`],
    ]),
    price: 19.99,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800",
      "https://images.unsplash.com/photo-1752771433743-47a49376fb63?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1752867942884-e58115c2cc52?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
  };

  return (
    <div className="max-w-7xl mx-auto py-40 px-4">
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Carousel */}
          <div>
            <ImageCarousel
              images={product.images}
              height="h-[250px] md:h-[400px]"
            />
          </div>

          {/* Right: Details */}
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <h1 className="text-4xl font-bold">{product.name}</h1>
            <p className="text-xl text-blue-600">
              ${product.price.toFixed(2)}
            </p>
            <hr className="border-gray-500" />
            <ClotheSizeSelector />
            <hr className="border-gray-500" />
            <p className="leading-relaxed">
              {product.description.get("Overview") ||
                "No description available."}
            </p>
            {/* add more specs, links, buttons, etc. */}
          </div>
        </div>
        <hr className="my-4 border-gray-500" />
        <ProductDescription description={product.description} />
      </div>
    </div>
  );
}
