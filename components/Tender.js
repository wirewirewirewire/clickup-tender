import Description from "./Description";

// posts will be populated at build time by getStaticProps()
function Tender({ posts }) {
  return (
    <div>
      <h3>{JSON.stringify(posts)}</h3>
      <ul>
        {/*posts.map((post) => (
          <li>{post.title}</li>
        ))*/}
      </ul>
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const token = process.env.CLICKUP_TOKEN;
  //const res = await fetch("https://api.clickup.com/api/v2/list/list_id");

  const res = await fetch("https://api.clickup.com/api/v2/list/list_id", {
    method: "get",
    headers: new Headers({
      Authorization: `${token}`,
    }),
  });

  const posts = await res.json();

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
}

export default Tender;
