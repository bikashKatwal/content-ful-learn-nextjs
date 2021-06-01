import Link from 'next/link';
import Image from 'next/image';

function ReceipeCard({recipe}) {
    const {title,slug,cookingTime,featuredImage,ingredients,method,thumbnail}=recipe.fields
    return (
        <div className="card">
           <div className="featured">
               {/*image thumbnail*/}
               <Image src={`https:${thumbnail.fields.file.url}`} 
               width={thumbnail.fields.file.details.image.width}
               height={thumbnail.fields.file.details.image.height}
               />
           </div>
           <div className="content">
                <div className="info">
                    <h4>{title}</h4>
                    <p>Takes approx {cookingTime} mins to make</p>
                </div>
                <div className="actions">
                    <Link href={`/recipes/${slug}`}>
                        <a>Cook This</a>
                    </Link>
                </div>
           </div>
        </div>
    );
}

export default ReceipeCard;