require_relative '../lib/policy_ocr'

describe PolicyOcr do
  it "loads" do
    expect(PolicyOcr).to be_a Module
  end

  it 'loads the sample.txt' do
    expect(fixture('sample').lines.count).to eq(44)
  end

  it 'contains underscores, spaces, and pipes' do
    text = fixture('sample')
    expect(text).to include('_')
    expect(text).to include(' ')
    expect(text).to include('|')
  end
end
