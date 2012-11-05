require "csv"

paises = []

CSV.foreach("../data/llegada_extranjeros_2012.csv", {:headers => true}) do |row|
	paises << row.to_hash
end
print paises