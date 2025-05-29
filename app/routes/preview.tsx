import { Link } from "react-router";

export default function Preview() {
  const models = [
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/300/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/300/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/300/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/200/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/200/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/200/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/200/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/300/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/300/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/300/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/200/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/200/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/200/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/200/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/300/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/300/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/300/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/200/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/200/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/200/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/200/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/300/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/300/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/300/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/200/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/200/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/200/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/200/200"
    },{
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/300/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/300/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/300/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/200/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/200/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/200/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/200/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/300/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/300/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/300/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/200/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/200/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/200/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/200/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/300/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/300/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/300/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/200/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/200/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/200/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/200/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/300/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/300/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/300/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/200/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/200/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/200/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/200/200"
    },{
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/300/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/300/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/300/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/200/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/200/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/200/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/200/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/300/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/300/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/300/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/200/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/200/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/200/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/200/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/300/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/300/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/300/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/200/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/200/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/200/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/200/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/300/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/300/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/300/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/300/200"
    },
    {
      id: 1,
      name: "Neo",
      url: "https://placecats.com/neo/200/200",
    },
    {
      id: 2,
      name: "Millie",
      url: "https://placecats.com/millie/200/200"
    },
    {
      id: 3,
      name: "Neo Banana",
      url: "https://placecats.com/neo_banana/200/200"
    },
    {
      id: 4,
      name: "Bella",
      url: "https://placecats.com/bella/200/200"
    },
  ];
	return (
          <div 
            class="
              m-10 p-10
              grid grid-cols-4 
              lg:grid-cols-5 lg:m-20
              xl:grid-cols-6 xl:m-30
              mt-30
              gap-4 
              place-items-center
              "
            >
              {
                models.map((model) => {
                    return (
                      <div
                        class=""
                      >
                          <Link to={`models/${model.id}`}>
                            <img src={model.url} 
                              class="
                                transition ease-in-out
                                duration-500
                                hover:scale-[1.5]
                                overflow-hidden
                                rounded-xl
                              "
                            />
                            <p>{model.id}.{model.name}</p>
                          </Link>
                      </div>
                    );
                  }
                )
              }
          </div>
    );
}