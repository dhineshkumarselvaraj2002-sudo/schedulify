interface Props { 
	params: { teamId: string } 
}

export default function TeamPage({ params }: Props) {
	return (
		<main className="p-6">
			<h1 className="text-xl font-semibold">Team: {params.teamId}</h1>
		</main>
	);
}
